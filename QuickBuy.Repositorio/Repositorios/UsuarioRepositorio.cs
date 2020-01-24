using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Repositorio.Contexto;
using System.Linq;

namespace QuickBuy.Repositorio.Repositorios
{
    public class UsuarioRepositorio : BaseRepositorio<Usuario>, IUsuarioRepositorio
    {
        public UsuarioRepositorio(QuickBuyContexto quickBuyContexto) : base(quickBuyContexto)
        {

        }

        public Usuario Obter(string email, string senha)
        {
            var usuario = QuickBuyContexto.Usuarios.FirstOrDefault(x => x.Email == email && x.Senha == senha);
            return usuario;
        }
    }
}
