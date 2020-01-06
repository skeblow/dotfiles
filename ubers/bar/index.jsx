// Update every second for the clock. Expensive elements should
// throttle themselves
export const refreshFrequency = 20000 // ms

import { theme } from './lib/style.js'
import {
    Battery,
    Cpu,
    Time,
    Workspaces,
    Playing,
    Mem,
    FocusedApp,
    Hdd
} from './src/index.jsx'

const config = {
    time: {
        format: "%l:%M %p",
        style: {
            padding: '0 15px',
            backgroundColor: theme.backgroundLight,
        }
    },
    battery: {
        style: {}
    },
    workspaces: {
        style: {}
    },
    focusedApp: {
        style: {}
    },
    cpu: {
        style: {
        color: "#0cf"
    }
  },
    mem: {
        style: {
            color: "#f55"
        }
    },
    hdd: {
        style: {
            color: "#aaa"
        }
    },
  playing: {
    style: {}
  }
}

const barStyle = {
  top: 0,
  right: 0,
  left: 0,
  position: 'fixed',
  background: theme.background,
  overflow: 'hidden',
  color: theme.text,
  height: '25px',
  fontFamily: 'Helvetica',
  fontSize: '.9rem',
  boxShadow: '0px 2px 5px 0 #000000',
}


const result = (data, key) => {
  try {
    return JSON.parse(data)[key]
  } catch (e) {
    return ''
  }
}

export const command = 'sh bar/update.sh'

export const render = ({ output, error }) => {
    if (error) {
        console.log(new Date())
        console.log(error)
        console.log(String(error))
        return  (
            <div style={barStyle}>error: {error}</div>
        )
    }

    return (
        <div style={barStyle}>
            <link rel="stylesheet" type="text/css" href="bar/assets/font-awesome/css/all.min.css" />
            <Workspaces config={config.workspaces} data={result(output,"workspaces")} side="left" />
        <FocusedApp config={config.focusedApp} data={result(output, "focusedApp")} side="left" />
            <Time config={config.time} side="right"></Time>
            <Battery config={config.battery} data={result(output, "battery")} side="right" />
            <Cpu config={config.cpu} side="right" data={result(output, "cpu")}></Cpu>
            <Mem config={config.mem} side="right" data={result(output, "mem")}></Mem>
            <Hdd config={config.hdd} side="right" data={result(output, "hdd")}></Hdd>
        </div>
    )
}
