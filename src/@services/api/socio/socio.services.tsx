export async function registerSocioServices(data: any) {
    try {
      const response = await fetch("/socios/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Error al registrar el socio.");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error;
    }
  }
  