# Linux info collaction from the SV08 Max mainboard
Welcome to SPI-XI 2.3.3 Bullseye with Linux 5.16.17-sun50iw9

> uname -a
Linux SPI-XI 5.16.17-sun50iw9 #2.3.3 SMP Tue Jan 21 10:22:53 CST 2025 aarch64 GNU/Linux

> sudo apt-get install device-tree-compiler

Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
device-tree-compiler is already the newest version (1.6.0-1).
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.

> dtc -I fs -O dts /sys/firmware/devicetree/base > extracted_board.dts

<stdout>: Warning (unit_address_vs_reg): /soc: node has a reg or ranges property, but no unit name
<stdout>: Warning (unit_address_vs_reg): /soc/pwm0@0300a000: node has a unit name, but no reg property
<stdout>: Warning (unit_address_vs_reg): /soc/pwm5@0300a000: node has a unit name, but no reg property
<stdout>: Warning (unit_address_vs_reg): /soc/pwm1@0300a000: node has a unit name, but no reg property
<stdout>: Warning (unit_address_vs_reg): /soc/pwm2@0300a000: node has a unit name, but no reg property
<stdout>: Warning (unit_address_vs_reg): /soc/pwm3@0300a000: node has a unit name, but no reg property
<stdout>: Warning (unit_address_vs_reg): /soc/hdmi-audio@1: node has a unit name, but no reg property
<stdout>: Warning (unit_address_vs_reg): /soc/sound@0: node has a unit name, but no reg property
<stdout>: Warning (unit_address_vs_reg): /soc/pwm4@0300a000: node has a unit name, but no reg property
<stdout>: Warning (unit_address_vs_reg): /ws2812/ws2812_pin@0: node has a unit name, but no reg property
<stdout>: Warning (unit_address_vs_reg): /memory: node has a reg or ranges property, but no unit name
<stdout>: Warning (unit_address_format): /soc/efuse@3006000/cpu-speed-grade@00: unit name should not have leading 0s
<stdout>: Warning (simple_bus_reg): /soc/pwm0@0300a000: missing or empty reg/ranges property
<stdout>: Warning (simple_bus_reg): /soc/ahub-i2s3@0x05097000: simple-bus unit address format error, expected "5097000"
<stdout>: Warning (simple_bus_reg): /soc/pwm5@0300a000: missing or empty reg/ranges property
<stdout>: Warning (simple_bus_reg): /soc/cpudai2-controller@0x05097000: simple-bus unit address format error, expected "5097000"
<stdout>: Warning (simple_bus_reg): /soc/gpu@0x01800000: simple-bus unit address format error, expected "1800000"
<stdout>: Warning (simple_bus_reg): /soc/ahub-i2s1@0x05097000: simple-bus unit address format error, expected "5097000"
<stdout>: Warning (simple_bus_reg): /soc/pwm1@0300a000: missing or empty reg/ranges property
<stdout>: Warning (simple_bus_reg): /soc/addr-mgt: missing or empty reg/ranges property
<stdout>: Warning (simple_bus_reg): /soc/pwm2@0300a000: missing or empty reg/ranges property
<stdout>: Warning (simple_bus_reg): /soc/sunxi-info: missing or empty reg/ranges property
<stdout>: Warning (simple_bus_reg): /soc/cpudai0-controller@0x05097000: simple-bus unit address format error, expected "5097000"
<stdout>: Warning (simple_bus_reg): /soc/dump_reg@20000: simple-bus unit address format error, expected "0"
<stdout>: Warning (simple_bus_reg): /soc/pwm3@0300a000: missing or empty reg/ranges property
<stdout>: Warning (simple_bus_reg): /soc/hdmi-audio@1: missing or empty reg/ranges property
<stdout>: Warning (simple_bus_reg): /soc/codec@05096000: simple-bus unit address format error, expected "5096000"
<stdout>: Warning (simple_bus_reg): /soc/sound@0: missing or empty reg/ranges property
<stdout>: Warning (simple_bus_reg): /soc/cpudai1-controller@0x05097000: simple-bus unit address format error, expected "5097000"
<stdout>: Warning (simple_bus_reg): /soc/pwm4@0300a000: missing or empty reg/ranges property
<stdout>: Warning (simple_bus_reg): /soc/ahub_codec@0x05097000: simple-bus unit address format error, expected "5097000"
<stdout>: Warning (unique_unit_address): /soc/pwm0@0300a000: duplicate unit-address (also used in node /soc/pwm5@0300a000)
<stdout>: Warning (unique_unit_address): /soc/ahub-i2s3@0x05097000: duplicate unit-address (also used in node /soc/cpudai2-controller@0x05097000)
<stdout>: Warning (unique_unit_address): /soc/ahub-i2s3@0x05097000: duplicate unit-address (also used in node /soc/ahub-i2s1@0x05097000)
<stdout>: Warning (unique_unit_address): /soc/cpudai2-controller@0x05097000: duplicate unit-address (also used in node /soc/ahub-i2s1@0x05097000)
<stdout>: Warning (unique_unit_address): /soc/pwm0@0300a000: duplicate unit-address (also used in node /soc/pwm1@0300a000)
<stdout>: Warning (unique_unit_address): /soc/pwm5@0300a000: duplicate unit-address (also used in node /soc/pwm1@0300a000)
<stdout>: Warning (unique_unit_address): /soc/pwm0@0300a000: duplicate unit-address (also used in node /soc/pwm2@0300a000)
<stdout>: Warning (unique_unit_address): /soc/pwm5@0300a000: duplicate unit-address (also used in node /soc/pwm2@0300a000)
<stdout>: Warning (unique_unit_address): /soc/pwm1@0300a000: duplicate unit-address (also used in node /soc/pwm2@0300a000)
<stdout>: Warning (unique_unit_address): /soc/ahub-i2s3@0x05097000: duplicate unit-address (also used in node /soc/cpudai0-controller@0x05097000)
<stdout>: Warning (unique_unit_address): /soc/cpudai2-controller@0x05097000: duplicate unit-address (also used in node /soc/cpudai0-controller@0x05097000)     
<stdout>: Warning (unique_unit_address): /soc/ahub-i2s1@0x05097000: duplicate unit-address (also used in node /soc/cpudai0-controller@0x05097000)
<stdout>: Warning (unique_unit_address): /soc/pwm0@0300a000: duplicate unit-address (also used in node /soc/pwm3@0300a000)
<stdout>: Warning (unique_unit_address): /soc/pwm5@0300a000: duplicate unit-address (also used in node /soc/pwm3@0300a000)
<stdout>: Warning (unique_unit_address): /soc/pwm1@0300a000: duplicate unit-address (also used in node /soc/pwm3@0300a000)
<stdout>: Warning (unique_unit_address): /soc/pwm2@0300a000: duplicate unit-address (also used in node /soc/pwm3@0300a000)
<stdout>: Warning (unique_unit_address): /soc/ahub-i2s3@0x05097000: duplicate unit-address (also used in node /soc/cpudai1-controller@0x05097000)
<stdout>: Warning (unique_unit_address): /soc/cpudai2-controller@0x05097000: duplicate unit-address (also used in node /soc/cpudai1-controller@0x05097000)     
<stdout>: Warning (unique_unit_address): /soc/ahub-i2s1@0x05097000: duplicate unit-address (also used in node /soc/cpudai1-controller@0x05097000)
<stdout>: Warning (unique_unit_address): /soc/cpudai0-controller@0x05097000: duplicate unit-address (also used in node /soc/cpudai1-controller@0x05097000)     
<stdout>: Warning (unique_unit_address): /soc/pwm0@0300a000: duplicate unit-address (also used in node /soc/pwm4@0300a000)
<stdout>: Warning (unique_unit_address): /soc/pwm5@0300a000: duplicate unit-address (also used in node /soc/pwm4@0300a000)
<stdout>: Warning (unique_unit_address): /soc/pwm1@0300a000: duplicate unit-address (also used in node /soc/pwm4@0300a000)
<stdout>: Warning (unique_unit_address): /soc/pwm2@0300a000: duplicate unit-address (also used in node /soc/pwm4@0300a000)
<stdout>: Warning (unique_unit_address): /soc/pwm3@0300a000: duplicate unit-address (also used in node /soc/pwm4@0300a000)
<stdout>: Warning (unique_unit_address): /soc/ahub-i2s3@0x05097000: duplicate unit-address (also used in node /soc/ahub_codec@0x05097000)
<stdout>: Warning (unique_unit_address): /soc/cpudai2-controller@0x05097000: duplicate unit-address (also used in node /soc/ahub_codec@0x05097000)
<stdout>: Warning (unique_unit_address): /soc/ahub-i2s1@0x05097000: duplicate unit-address (also used in node /soc/ahub_codec@0x05097000)
<stdout>: Warning (unique_unit_address): /soc/cpudai0-controller@0x05097000: duplicate unit-address (also used in node /soc/ahub_codec@0x05097000)
<stdout>: Warning (unique_unit_address): /soc/cpudai1-controller@0x05097000: duplicate unit-address (also used in node /soc/ahub_codec@0x05097000)
<stdout>: Warning (unique_unit_address): /soc/spi@5011000/st7796@1: duplicate unit-address (also used in node /soc/spi@5011000/spidev@1)
<stdout>: Warning (clocks_property): /wifi-pwrseq:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/phy@5100400:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/phy@5100400:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/phy@5100400:clocks: cell 4 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/phy@5100400:clocks: cell 6 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/phy@5100400:clocks: cell 8 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/mmc@4022000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/mmc@4022000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ahub-i2s3@0x05097000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ahub-i2s3@0x05097000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ahub-i2s3@0x05097000:clocks: cell 4 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ahub-i2s3@0x05097000:clocks: cell 6 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ethernet@5030000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ethernet@5030000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/hdmi@6000000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/hdmi@6000000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/hdmi@6000000:clocks: cell 4 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/hdmi@6000000:clocks: cell 6 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/hdmi@6000000:clocks: cell 8 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/hdmi@6000000:clocks: cell 10 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/clock@7010000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/clock@7010000:clocks: cell 1 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/clock@7010000:clocks: cell 3 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/clock@7010000:clocks: cell 5 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/pinctrl@300b000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/pinctrl@300b000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/pinctrl@300b000:clocks: cell 3 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/pwm@300a000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/pwm@300a000:clocks: cell 1 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/bus@1000000/mixer@100000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/bus@1000000/mixer@100000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/bus@1000000/clock@8000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/bus@1000000/clock@8000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/gpu@0x01800000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/gpu@0x01800000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/i2c@5002800:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ahub-i2s1@0x05097000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ahub-i2s1@0x05097000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ahub-i2s1@0x05097000:clocks: cell 4 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ahub-i2s1@0x05097000:clocks: cell 6 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/lcd-controller@6515000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/lcd-controller@6515000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/i2c@5003000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5311400:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5311400:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5311400:clocks: cell 4 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/mmc@4021000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/mmc@4021000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5101400:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5101400:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5101400:clocks: cell 4 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/clock@3001000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/clock@3001000:clocks: cell 1 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/clock@3001000:clocks: cell 3 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/serial@5001400:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/video-codec@1c0e000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/video-codec@1c0e000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/video-codec@1c0e000:clocks: cell 4 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/thermal-sensor@5070400:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/i2c@7081400:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/i2c@5002400:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/rsb@7083000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/spi@5011000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/spi@5011000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/spi@5011000/mcp2515@0:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/serial@5000800:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5311000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5311000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5311000:clocks: cell 4 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5311000:clocks: cell 6 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/i2c@5002c00:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/i2c@5002c00/mfd@10:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5200400:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5200400:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5200400:clocks: cell 4 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5101000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5101000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5101000:clocks: cell 4 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5101000:clocks: cell 6 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/tcon-top@6510000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/tcon-top@6510000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/serial@5001000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/hdmi-phy@6010000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/hdmi-phy@6010000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/i2c@5002000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5310400:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5310400:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/mmc@4020000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/mmc@4020000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/serial@5000400:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/dma-controller@3002000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/dma-controller@3002000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5200000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5200000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5200000:clocks: cell 4 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5200000:clocks: cell 6 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ethernet@5020000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/codec@05096000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/codec@05096000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/codec@05096000:clocks: cell 4 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/serial@5000c00:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/spi@5010000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/spi@5010000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/pinctrl@7022000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/pinctrl@7022000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/pinctrl@7022000:clocks: cell 3 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5310000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5310000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5310000:clocks: cell 4 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ir@7040000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ir@7040000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ahub_codec@0x05097000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ahub_codec@0x05097000:clocks: cell 2 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ahub_codec@0x05097000:clocks: cell 4 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/ahub_codec@0x05097000:clocks: cell 6 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/watchdog@30090a0:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/usb@5100000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /soc/serial@5000000:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /cpus/cpu@1:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /cpus/cpu@2:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /cpus/cpu@0:clocks: cell 0 is not a phandle reference
<stdout>: Warning (clocks_property): /cpus/cpu@3:clocks: cell 0 is not a phandle reference
<stdout>: Warning (cooling_device_property): /thermal-zones/cpu-thermal/cooling-maps/cpu_very_hot_limit_cpu:cooling-device: cell 0 is not a phandle reference  
<stdout>: Warning (cooling_device_property): /thermal-zones/cpu-thermal/cooling-maps/cpu_warm_limit_cpu:cooling-device: cell 0 is not a phandle reference      
<stdout>: Warning (cooling_device_property): /thermal-zones/cpu-thermal/cooling-maps/cpu_hot_limit_cpu:cooling-device: cell 0 is not a phandle reference       
<stdout>: Warning (cooling_device_property): /thermal-zones/cpu-thermal/cooling-maps/cpu_hot_pre_limit_cpu:cooling-device: cell 0 is not a phandle reference
<stdout>: Warning (dmas_property): /soc/cpudai2-controller@0x05097000:dmas: cell 0 is not a phandle reference
<stdout>: Warning (dmas_property): /soc/cpudai2-controller@0x05097000:dmas: cell 2 is not a phandle reference
<stdout>: Warning (dmas_property): /soc/spi@5011000:dmas: cell 0 is not a phandle reference
<stdout>: Warning (dmas_property): /soc/spi@5011000:dmas: cell 2 is not a phandle reference
<stdout>: Warning (dmas_property): /soc/cpudai0-controller@0x05097000:dmas: cell 0 is not a phandle reference
<stdout>: Warning (dmas_property): /soc/cpudai0-controller@0x05097000:dmas: cell 2 is not a phandle reference
<stdout>: Warning (dmas_property): /soc/codec@05096000:dmas: cell 0 is not a phandle reference
<stdout>: Warning (dmas_property): /soc/spi@5010000:dmas: cell 0 is not a phandle reference
<stdout>: Warning (dmas_property): /soc/spi@5010000:dmas: cell 2 is not a phandle reference
<stdout>: Warning (dmas_property): /soc/cpudai1-controller@0x05097000:dmas: cell 0 is not a phandle reference
<stdout>: Warning (dmas_property): /soc/cpudai1-controller@0x05097000:dmas: cell 2 is not a phandle reference
<stdout>: Warning (phys_property): /soc/hdmi@6000000:phys: cell 0 is not a phandle reference
<stdout>: Warning (phys_property): /soc/usb@5311400:phys: cell 0 is not a phandle reference
<stdout>: Warning (phys_property): /soc/usb@5101400:phys: cell 0 is not a phandle reference
<stdout>: Warning (phys_property): /soc/usb@5311000:phys: cell 0 is not a phandle reference
<stdout>: Warning (phys_property): /soc/usb@5200400:phys: cell 0 is not a phandle reference
<stdout>: Warning (phys_property): /soc/usb@5101000:phys: cell 0 is not a phandle reference
<stdout>: Warning (phys_property): /soc/usb@5310400:phys: cell 0 is not a phandle reference
<stdout>: Warning (phys_property): /soc/usb@5200000:phys: cell 0 is not a phandle reference
<stdout>: Warning (phys_property): /soc/usb@5310000:phys: cell 0 is not a phandle reference
<stdout>: Warning (phys_property): /soc/usb@5100000:phys: cell 0 is not a phandle reference
<stdout>: Warning (pwms_property): /ac200_clk:pwms: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/phy@5100400:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/phy@5100400:resets: cell 2 is not a phandle reference
<stdout>: Warning (resets_property): /soc/phy@5100400:resets: cell 4 is not a phandle reference
<stdout>: Warning (resets_property): /soc/phy@5100400:resets: cell 6 is not a phandle reference
<stdout>: Warning (resets_property): /soc/mmc@4022000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/ethernet@5030000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/hdmi@6000000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/hdmi@6000000:resets: cell 2 is not a phandle reference
<stdout>: Warning (resets_property): /soc/pwm@300a000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/bus@1000000/mixer@100000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/bus@1000000/clock@8000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/gpu@0x01800000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/i2c@5002800:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/lcd-controller@6515000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/i2c@5003000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5311400:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5311400:resets: cell 2 is not a phandle reference
<stdout>: Warning (resets_property): /soc/mmc@4021000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5101400:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5101400:resets: cell 2 is not a phandle reference
<stdout>: Warning (resets_property): /soc/serial@5001400:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/video-codec@1c0e000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/thermal-sensor@5070400:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/i2c@7081400:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/i2c@5002400:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/rsb@7083000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/spi@5011000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/serial@5000800:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5311000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5311000:resets: cell 2 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5311000:resets: cell 4 is not a phandle reference
<stdout>: Warning (resets_property): /soc/i2c@5002c00:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5200400:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5200400:resets: cell 2 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5101000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5101000:resets: cell 2 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5101000:resets: cell 4 is not a phandle reference
<stdout>: Warning (resets_property): /soc/tcon-top@6510000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/serial@5001000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/hdmi-phy@6010000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/i2c@5002000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5310400:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/mmc@4020000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/serial@5000400:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/dma-controller@3002000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5200000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5200000:resets: cell 2 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5200000:resets: cell 4 is not a phandle reference
<stdout>: Warning (resets_property): /soc/ethernet@5020000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/codec@05096000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/serial@5000c00:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/spi@5010000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5310000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5310000:resets: cell 2 is not a phandle reference
<stdout>: Warning (resets_property): /soc/ir@7040000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/ahub_codec@0x05097000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/usb@5100000:resets: cell 0 is not a phandle reference
<stdout>: Warning (resets_property): /soc/serial@5000000:resets: cell 0 is not a phandle reference
<stdout>: Warning (thermal_sensors_property): /thermal-zones/cpu-thermal:thermal-sensors: cell 0 is not a phandle reference
<stdout>: Warning (thermal_sensors_property): /thermal-zones/ddr-thermal:thermal-sensors: cell 0 is not a phandle reference
<stdout>: Warning (thermal_sensors_property): /thermal-zones/ve-thermal:thermal-sensors: cell 0 is not a phandle reference
<stdout>: Warning (thermal_sensors_property): /thermal-zones/gpu-thermal:thermal-sensors: cell 0 is not a phandle reference
<stdout>: Warning (gpios_property): /wifi-pwrseq:reset-gpios: cell 0 is not a phandle reference
<stdout>: Warning (gpios_property): /soc/spi@5011000:cs-gpios: cell 0 is not a phandle reference
<stdout>: Warning (gpios_property): /soc/spi@5011000:cs-gpios: cell 4 is not a phandle reference
<stdout>: Warning (gpios_property): /soc/spi@5011000:cs-gpios: cell 8 is not a phandle reference
<stdout>: Warning (gpios_property): /soc/spi@5011000/st7796@1:dc-gpios: cell 0 is not a phandle reference
<stdout>: Warning (gpios_property): /leds/gpio_2:gpios: cell 0 is not a phandle reference
<stdout>: Warning (gpios_property): /leds/led-1:gpio: cell 0 is not a phandle reference
<stdout>: Warning (gpios_property): /leds/gpio_1:gpios: cell 0 is not a phandle reference
<stdout>: Warning (gpios_property): /i2c-gpio:gpios: cell 0 is not a phandle reference
<stdout>: Warning (gpios_property): /i2c-gpio:gpios: cell 4 is not a phandle reference
<stdout>: Warning (gpios_property): /ws2812/ws2812_pin@0:gpios: cell 0 is not a phandle reference
<stdout>: Warning (graph_child_address): /soc/tcon-top@6510000/ports/port@0: graph node has single child node 'endpoint@0', #address-cells/#size-cells are not necessary
<stdout>: Warning (graph_child_address): /soc/tcon-top@6510000/ports/port@4: graph node has single child node 'endpoint@0', #address-cells/#size-cells are not necessary


> dpkg --list | grep linux-image
ii  linux-image-current-sun50iw9   2.3.3                              arm64        Linux kernel, armbian version 5.16.17-sun50iw9 current

> zcat /usr/share/doc/linux-image-current-sun50iw9/changelog.Debian.gz | less
linux-5.16.17-sun50iw9 (2.3.3) jammy; urgency=low

  * Armbian built Linux kernel. current

 -- SPI-XI <tech@biqu3d.com>  Tue, 21 Jan 2025 10:22:52 +0800
(END)
