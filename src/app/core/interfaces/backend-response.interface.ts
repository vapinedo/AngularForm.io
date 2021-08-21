export interface BackendResponse {
    data: any;
    level: number;
    message: string;
    messages: string[];
}

interface Data {
    flags: Flag[];
    pregunta: Pregunta;
    controles: Control[];
}

interface Control {
    field: string;
    enabled: boolean;
    visible: boolean;
    etiqueta: string;
    permanente: boolean;
}

interface Flag {
    id: string;
    tipo: string;
    valor: string;
}

interface Pregunta {
    texto: string;
    valor: string;
    codigo: string;
    valoraborta: string;
}