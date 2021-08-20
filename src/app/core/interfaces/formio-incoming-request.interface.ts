export interface FormioIncomingRequest {
    nom_form: string;
    cod_prog: string;
    qbe_asoc: string;
    jsn_cont: Component[];
}

interface Component {
    key: string;
    type: string;
    label: string;
    input: boolean;
    tableView: boolean;
    disableOnInvalid?: boolean;
}