import jwt from "jwt-simple";

export function encodeToken(obj: any) {
  return jwt.encode(obj, process.env.REACT_APP_TK!);
};

export function decodeToken(tk: string) {
  return jwt.decode(tk, process.env.REACT_APP_TK!);
};

export function getCookie(cname: string) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    };
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    };
  }
  return "";
};

export function checkCookie(): Promise<boolean> {
  return new Promise<boolean>(async (resolve) => {
    var acc: any = getCookie("atl_trc_mtp");
    if (acc === "") {
        localStorage.removeItem("acc");
        resolve(true);
    };
  })
};

export function getServer(){
  //direccion ip del servidor
  return "http://localhost:3001"
};