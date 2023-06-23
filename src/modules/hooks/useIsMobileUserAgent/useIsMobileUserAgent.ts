import { useEffect, useState } from 'react';

export const useIsMobileUserAgent = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkUserAgent = () => {
      const userAgent = window.navigator.userAgent;
      const mobileUserAgents = [
        /Android/i,
        /BlackBerry/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /Opera Mini/i,
        /IEMobile/i,
        /Mobile/i,
      ];
      setIsMobile(mobileUserAgents.some((regex) => regex.test(userAgent)));
    };
    checkUserAgent();
  }, []);
  return { isMobile };
};
