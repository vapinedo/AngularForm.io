export interface FormioRequest {
    qbe: qbe;
    data: any;
    estado: string;
    evento: string; // metodo del form componente formio
    disparador: string; // key del componente formio
}

interface qbe {
    qbeid: string;
    programaid: string;
}