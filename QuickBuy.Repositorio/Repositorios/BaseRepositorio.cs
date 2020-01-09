using QuickBuy.Dominio.Contratos;
using QuickBuy.Repositorio.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuickBuy.Repositorio.Repositorios
{
    public class BaseRepositorio<TEntity> : IBaseRepositorio<TEntity> where TEntity : class
    {
        private readonly QuickBuyContexto _quickBuyContexto;

        public BaseRepositorio(QuickBuyContexto quickBuyContexto)
        {
            _quickBuyContexto = quickBuyContexto;
        }

        public void Adicionar(TEntity entity)
        {
            _quickBuyContexto.Set<TEntity>().Add(entity);
        }

        public void Atualizar(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public TEntity ObterPorId(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TEntity> ObterTodos()
        {
            return _quickBuyContexto.Set<TEntity>().ToList();

        }

        public void Remover(TEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
