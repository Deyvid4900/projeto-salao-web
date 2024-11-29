import { useEffect, useState } from "react";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("Usuário aceitou o prompt de instalação");
        } else {
          console.log("Usuário rejeitou o prompt de instalação");
        }
        setDeferredPrompt(null);
        setIsInstallable(false);
      });
    }
  };

  return (
    isInstallable &&(
    <button className="dropdown-item" onClick={handleInstallClick}>
      Adicionar à tela inicial
    </button>
  )
  );
};

export default InstallButton;
