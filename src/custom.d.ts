declare module '*.jpeg' {
    const content: string; // Declara uma constante chamada 'content' do tipo string
    export default content; // Exporta essa constante como o valor padrão
}

declare module '*.gif' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const content: string;
    export default content;
}