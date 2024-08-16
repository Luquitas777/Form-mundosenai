"use client";

import React, { useState } from 'react';
import './style.css'; // Importe o arquivo de estilos

// Tipos e interfaces
interface ICurso {
    id: number;
    titulo: string;
    preco: number;
}

interface ShoppingItem {
    produto: ICurso;
    quantidade: number;
}

// Dados dos cursos
const cursos: ICurso[] = [
    { id: 1, titulo: "Informática Básica", preco: 530.00 },
    { id: 2, titulo: "Mecânico de Motocicletas", preco: 530.00 },
    { id: 3, titulo: "Técnico em Robôs Gigantes", preco: 910.00 },
    { id: 4, titulo: "Mecânico de Armas a Laser", preco: 520.00 },
    { id: 5, titulo: "Treinador de Ursos Gigantes", preco: 900.00 },
    { id: 6, titulo: "Agiota", preco: 600.00 },
];

// Componente principal
const MarketCarPages: React.FC = () => {
    const [shoppingCursos, setShoppingCursos] = useState<ShoppingItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState<'price' | 'title'>('title');

    const handleAddCurso = (id: number) => {
        const curso = cursos.find(curso => curso.id === id);
        if (!curso) return;

        setShoppingCursos(prevShoppingCursos => {
            const itemIndex = prevShoppingCursos.findIndex(item => item.produto.id === id);

            if (itemIndex > -1) {
                const updatedCursos = [...prevShoppingCursos];
                updatedCursos[itemIndex].quantidade += 1;
                return updatedCursos;
            } else {
                return [...prevShoppingCursos, { produto: curso, quantidade: 1 }];
            }
        });
    };

    const handleRemoverCurso = (id: number) => {
        setShoppingCursos(prevShoppingCursos => {
            const itemIndex = prevShoppingCursos.findIndex(item => item.produto.id === id);

            if (itemIndex > -1) {
                const item = prevShoppingCursos[itemIndex];

                if (item.quantidade > 1) {
                    const updatedCursos = [...prevShoppingCursos];
                    updatedCursos[itemIndex].quantidade -= 1;
                    return updatedCursos;
                } else {
                    return prevShoppingCursos.filter(item => item.produto.id !== id);
                }
            }

            return prevShoppingCursos;
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredCursos = cursos.filter(curso =>
        curso.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedCursos = [...filteredCursos].sort((a, b) => {
        if (sortOption === 'price') {
            return a.preco - b.preco;
        }
        return a.titulo.localeCompare(b.titulo);
    });

    return (
        <div>
            <header>
                <h1>Cursos SENAI 2070</h1>
            </header>

            {/* Barra de Pesquisa */}
            <input
                type="text"
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={handleSearchChange}
            />

            {/* Opção de Ordenação */}
            <select
                value={sortOption}
                onChange={e => setSortOption(e.target.value as 'price' | 'title')}
            >
                <option value="title">Ordenar por Título</option>
                <option value="price">Ordenar por Preço</option>
            </select>

            {/* Lista de Cursos */}
            <ul>
                {sortedCursos.map(curso => (
                    <li key={curso.id}>
                        <p>{curso.titulo}</p>
                        <p>Preço: R${curso.preco.toFixed(2)}</p>
                        <button onClick={() => handleAddCurso(curso.id)}>Adicionar</button>
                    </li>
                ))}
            </ul>

            {/* Carrinho de Compras */}
            <ShoppingCart
                shoppingCursos={shoppingCursos}
                onRemoverCurso={handleRemoverCurso}
            />
        </div>
    );
};

// Componente do Carrinho de Compras
interface ShoppingCartProps {
    shoppingCursos: ShoppingItem[];
    onRemoverCurso: (id: number) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ shoppingCursos, onRemoverCurso }) => (
    <div>
        <h2>Carrinho de Compras</h2>
        <ul>
            {shoppingCursos.map(item => (
                <li key={item.produto.id}>
                    <p>Produto: {item.produto.titulo}</p>
                    <p>Preço: R${item.produto.preco.toFixed(2)}</p>
                    <p>Quantidade: {item.quantidade}</p>
                    <p>Total: R${(item.quantidade * item.produto.preco).toFixed(2)}</p>
                    <button onClick={() => onRemoverCurso(item.produto.id)}>Remover</button>
                </li>
            ))}
        </ul>
    </div>
);

export default MarketCarPages;

    

