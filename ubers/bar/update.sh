#!/bin/bash

CPUUSAGE=$(echo $(ps -A -o %cpu | awk '{s+=$1} END {print s "%"}'))
CPUTEMP=$(/usr/local/bin/osx-cpu-temp);

BAT=$(pmset -g batt | egrep '([0-9]+\%).*' -o --colour=auto | cut -f1 -d';');
BAT_CHARGING=$(pmset -g batt | grep "AC attached" | wc -l)
BAT_AC_POWER=$(pmset -g batt | grep "AC Power" | wc -l)

SPACE=$(if command -v /usr/local/bin/chunkc >/dev/null 2>&1; then echo $(/usr/local/bin/chunkc tiling::query -d id); else echo ""; fi)

MEM=$(echo $(($(vm_stat | grep "Pages free" | awk '{print $3}' | sed 's/\.//')/256)) | awk '{print $1" MiB"}' )

#FOCUSEDWORKSPACE=$(echo $(/usr/local/bin/yabai -m query --spaces | grep '"native-fullscreen":0' -B 1 | grep -v -- "^--$" | awk '!(NR%2){print$0p}{p=$0}' | grep '"focused":1' -B 9 | wc -l))
#WORKSPACESCOUNT=$(echo $(/usr/local/bin/yabai -m query --spaces | grep index | grep -o '[0-9],$') | awk '{print $NF}' | sed "s/,//");
FOCUSEDAPP=$(echo $(/usr/local/bin/yabai -m query --windows --window 2>/dev/null | grep app | sed 's/"//g' | grep -o ':[A-Za-z0-9]*' | sed 's/://'));

HDD=$(echo $(diskutil info / | grep "Free Space" | awk '{print $4 $5}'));

echo $(cat <<-EOF
    {
        "battery": {
            "level": "$BAT",
            "charging": $BAT_CHARGING,
            "ac": $BAT_AC_POWER
        },
        "workspaces": {
            "focused": "FOCUSEDWORKSPACE",
            "count": "WORKSPACESCOUNT"
        },
        "focusedApp": "$FOCUSEDAPP",
        "playing": "$SPOTIFY",
        "cpu": {
            "usage": "$CPUUSAGE",
            "temp": "$CPUTEMP"
        },
        "mem": "$MEM",
		"hdd": "$HDD"
    }
EOF
);

