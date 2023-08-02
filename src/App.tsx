import { useRecoilState, useSetRecoilState } from "recoil";
import tabState from "@/states/tabState";
import { AnimatePresence } from "framer-motion";
import Keypage from "@/views/KeyPage";
import DashboardPage from "@/views/DashboardPage";
import CashierPage from "@/views/bloxburg/Cashier";
import { useEffect, useState } from "react";
import keyState from "./states/keyState";

function App() {
  const [currentTab, setCurrentTab] = useRecoilState(tabState);
  const setKey = useSetRecoilState(keyState);

  const [version, setVersion] = useState("0.0.0");

  console.log(version);

  useEffect(() => {
    async function getVersion() {
      setVersion(await api.app.getVersion());
    }

    api.onKeyExpire(() => {
      api.showError(
        "Key Expired",
        "Your Key Has Expired, Get a Key From autoblox.xyz/getkey"
      );
      setKey("");
      setCurrentTab("key");
    });

    getVersion();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <nav className="fixed flex justify-between items-center w-full px-4 py-2 border-b border-b-zinc-600 bg-neutral-800">
        <span className="text-white font-semibold text-sm">
          AutoBlox <small>v{version}</small>
        </span>
        <button
          onClick={() => {
            api.app.close();
          }}
          className="text-zinc-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.85}
            stroke="currentColor"
            className="w-5 h-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </nav>

      <AnimatePresence mode="wait">
        <main key={currentTab} className="pt-12 h-screen overflow-y-auto">
          {(() => {
            switch (currentTab) {
              case "key":
                return <Keypage />;
                break;
              case "dashboard":
                return <DashboardPage />;
                break;
              case "bloxburg/cashier":
                return <CashierPage />;
            }
          })()}
        </main>
      </AnimatePresence>
    </>
  );
}

export default App;
