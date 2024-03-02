export interface BasicFormControl {
    id: number;
    value?: string | number;
    label?: string;
    type?: string;
    name?: string;
}

export interface Input {
    type: INPUT_TYPES;
    value: string;
    label: string;
}

export enum INPUT_TYPES {
    CHECKBOX = "lista wielokrotnego wyboru", 
    TEXT = "krótkie pole tekstowe", 
    TEXT_AREA = "pole tekstowe",  
    SLIDER = "zakres", 
    RADIO = "lista jednokrotnego wyboru"
}