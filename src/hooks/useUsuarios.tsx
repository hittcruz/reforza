import { useEffect, useRef, useState } from "react";
import { ReqResListado, Usuario } from "../interfaces/reqRes";
import { reqResApi } from "../api/reqRes";

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const pageRef = useRef(1);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const resp = await reqResApi.get<ReqResListado>("/users", {
      params: {
        page: pageRef.current,
      },
    });
    //console.log("datos tamaño" + resp.data.data.length + "-" + pageRef.current);
    if (resp.data.data.length > 0) {
      setUsuarios(resp.data.data);
    } else {
      pageRef.current--;
      alert("No hay mas registros ");
    }
    //setUsuarios(resp.data.data);
  };

  const paginaSiguiente = () => {
    pageRef.current++;
    cargarUsuarios();
  };

  const paginaAnterior = () => {
    if (pageRef.current > 1) {
      pageRef.current--;
      cargarUsuarios();
    } else {
      alert("Estas en la pagina 1");
    }
  };

  return {
    usuarios,
    paginaSiguiente,
    paginaAnterior,
  };
};
