export interface Genero {
  id: number;
  nome: string;
}

export interface ArtistaGenero {
  genero: Genero;
}

export interface Artista {
  id: number;
  nome: string;
  generos: ArtistaGenero[];
}

export interface DiscoArtista {
  artista: Artista;
}

export interface DiscoGenero {
  genero: Genero;
}

export interface Disco {
  id: number;
  titulo: string;
  anoLancamento: number;
  capa: string;
  artistas: {
    artista: Artista;
  }[];
  generos: {
    genero: Genero;
  }[];
  faixas: Faixa[];
}

export interface GeneroDetalhes extends Genero {
  artistas: {
    artista: Artista;
  }[];
  discos: {
    disco: Disco;
  }[];
}

export interface Faixa {
  id: number;
  titulo: string;
  duracao: number;
  discoId: number;
  generos: {
    genero: Genero;
  }[];
}