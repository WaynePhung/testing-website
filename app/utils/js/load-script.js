export default function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = src
      script.type = "module"
      script.onload = resolve
      script.onerror = reject
      document.head.appendChild(script)
    })
  }
  