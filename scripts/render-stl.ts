import { execa } from 'execa';
import { existsSync, writeFileSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Checks if a command exists in the system PATH (Windows)
 */
async function commandExists(cmd: string): Promise<boolean> {
    try {
        await execa('where', [cmd], { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

/**
 * Renders STL using OpenSCAD
 */
async function renderWithOpenSCAD(stlPath: string, outputPath: string, tempScadPath: string): Promise<void> {
    console.log(`[1/2] Attempting OpenSCAD render...`);
    const scadContent = `import("${stlPath.replace(/\\/g, '/')}");`;
    writeFileSync(tempScadPath, scadContent);

    await execa('openscad', ['-o', outputPath, tempScadPath]);
    console.log(`[SUCCESS] OpenSCAD successfully rendered: ${outputPath}`);
}

/**
 * Renders STL using Blender (Headless via Python)
 */
async function renderWithBlender(stlPath: string, outputPath: string, tempPyPath: string): Promise<void> {
    console.log(`[2/2] Attempting Blender render...`);
    
    // This Python script handles the 3D scene setup inside Blender
    const pythonScript = `
import bpy
import sys
import os

# Get args from command line
try:
    args = sys.argv
    idx_input = args.index('--') + 1
    stl_path = args[idx_input]
    output_path = args[idx_input + 1]
except (ValueError, IndexError):
    print("Usage: script.py -- <input_stl> <output_png>")
    sys.exit(1)

# 1. Clear Scene
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

# 2. Import STL
bpy.ops.import_scene.stl(filepath=stl_path)
obj = bpy.context.selected_objects[0]

# 3. Setup Camera
cam_data = bpy.data.cameras.new("Camera")
cam_obj = bpy.data.objects.new("Camera", cam_data)
bpy.context.collection.objects.link(cam_obj)
# Position camera away and look at object center
bpy_loc = obj.location
cam_obj.location = (bpy_loc.x + 5, bpy_loc.y + 5, bpy_loc.z + 5)
import math
from mathutils import geometry
direction = bpy_loc - cam_obj.location
cam_obj.rotation_euler = geometry.to_euler_6d(direction)

# 4. Setup Light
light_data = bpy.data.lights.new(name="Light", type='POINT')
light_obj = bpy.data.objects.new("Light", light_data)
bpy.context.collection.objects.link(light_obj)
light_obj.location = (bpy_loc.x - 3, bpy_loc.y - 3, bpy_loc.z + 5)
light_data.energy = 1000

# 5. Render Settings
bpy.context.scene.render.image_format = 'PNG'
bpy.context.scene.render.filepath = output_path
bpy.context.scene.render.resolution_x = 1024
bpy.context.scene.render.resolution_y = 1024
bpy.context.scene.render.engine = 'BLENDER_EEVEE_NEXT' if bpy.app.version >= (4, 2, 0) else 'BLENDER_EEVEE'

# 6. Execute Render
bpy.ops.render.render(write_still=True)
`;

    writeFileSync(tempPyPath, pythonScript);

    await execa('blender', ['-b', '-P', tempPyPath, '--', stlPath, outputPath]);
    console.log(`[SUCCESS] Blender successfully rendered: ${outputPath}`);
}

async function main() {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log("Usage: node scripts/render-stl.ts <input.stl> <output.png>");
        process.exit(1);
    }

    const stlPath = path.resolve(args[0]);
    const outputPath = path.resolve(args[1]);

    // Temporary file paths
    const tempScad = path.join(__dirname, 'temp_render.scad');
    const tempPy = path.join(__dirname, 'temp_render.py');

    try {
        if (existsSync(stlPath) === false) {
            console.error(`[ERROR] Error: Input file not found: ${stlPath}`);
            process.exit(1);
        }

        if (await commandExists('openscad')) {
            await renderWithOpenSCAD(stlPath, outputPath, tempScad);
        } else if (await commandExists('blender')) {
            await renderWithBlender(stlPath, outputPath, tempPy);
        } else {
            console.error("[ERROR] Error: Neither OpenSCAD nor Blender was found in your PATH.");
            process.exit(1);
        }
    } catch (error: any) {
        console.error("[ERROR] Rendering failed:", error.message);
        console.error(error.stderr);
    } finally {
        // Cleanup
        if (existsSync(tempScad)) unlinkSync(tempScad);
        if (existsSync(tempPy)) unlinkSync(tempPy);
        console.log("Cleanup complete.");
    }
}

main();
