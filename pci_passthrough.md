# pci passthrough setup

https://wiki.archlinux.org/title/PCI_passthrough_via_OVMF

## step 1 - preparations

## setup iommu

- in bios enable amd-vi
- append kernel parameter `iommu=pt` in `/boot/loader/entries/arch-zen.conf`
- check it using `dmesg | grep -i -e DMAR -e IOMMU`
- list iommu groups and find gpu

```
#!/bin/bash
shopt -s nullglob
for g in $(find /sys/kernel/iommu_groups/* -maxdepth 0 -type d | sort -V); do
    echo "IOMMU Group ${g##*/}:"
    for d in $g/devices/*; do
        echo -e "\t$(lspci -nns ${d##*/})"
    done;
done;
```

- grab ids in [] after gpu name like `[10de:13c2]`

## setup vfio

- into `/etc/modprobe.d/vfio.conf` add `options vfio-pci ids=10de:13c2,10de:0fbb`
- into `/etc/mkinitcpio.conf` add `vfio_pci vfio vfio_iommu_type1 vfio_virqfd` before any gpu drivers
- in `/etc/mkinitcpio.conf` ensure that hooks have modconf `HOOKS=(... modconf ...)`
- remove nvidia from `/etc/x11/xorg.conf`
- blacklist nvidia in `/etc/modprobe.d/blacklist.conf` `blacklist nvidia nouveau`
- run `mkinitcpio -P` to regenerate initramfs

## setup xorg


## bios

- f11
- `settings / advanced / windows os configuration` enable `windows 10 whql support`

## veryfication

- `dmesg | grep -i vfio`
- `lsmod | grep nvidia`
- `lsmod | grep nouveau`

## run libvirt and enjoy!