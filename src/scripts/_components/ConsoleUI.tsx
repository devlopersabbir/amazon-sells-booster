import { useEffect, useState } from "react";
import { Toaster } from "sonner";

const ConsoleUI = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (log: string) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  };

  useEffect(() => {
    // Simulate console log behavior
    addLog("Initializing Amazon Sells Booster...");
    setTimeout(() => addLog("Build started..."), 1000);
    setTimeout(() => addLog("Building for Chrome..."), 2000);
    setTimeout(() => addLog("Building for Firefox..."), 3000);
    setTimeout(() => addLog("Build complete! Ready for use!"), 4000);
  }, []);

  return (
    <div className="console-ui bg-gray-900 text-white rounded-lg p-4 max-h-[300px] overflow-y-auto shadow-lg w-full">
      <div className="console-header border-b-2 border-gray-700 pb-2 mb-2">
        <h3 className="text-lg font-bold">Amazon Sells Booster Console</h3>
        <p className="text-sm text-gray-400">Version: 0.0.8</p>
      </div>
      <div className="console-body">
        <ul className="list-none pl-0">
          {logs.map((log, index) => (
            <li key={index} className="font-mono text-sm mb-1">
              {log}
            </li>
          ))}
        </ul>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default ConsoleUI;
