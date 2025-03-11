export const decodeToken = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); 
      return payload;
    } catch (error) {
      console.error("Lỗi giải mã token:", error);
      return null;
    }
  }
  export const isTokenExpired = (token: string) => {
    const payload = decodeToken(token);
    if (!payload || !payload.exp) return true; 
    const currentTime = Math.floor(Date.now() / 1000); 
    return payload.exp < currentTime; 
  };