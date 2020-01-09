using QuickBuy.Dominio.Entidades;
using QuickBuy.Repositorio.Repositorios;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Repositorio
{
    public class Cliente
    {
        public Cliente()
        {
            var usuarioRepositorio = new UsuarioRepositorio();
            var usuario = new Usuario();

            usuarioRepositorio.Adicionar(usuario);
        }
    }
}
