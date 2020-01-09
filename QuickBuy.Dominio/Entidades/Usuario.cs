using System.Collections;
using System.Collections.Generic;

namespace QuickBuy.Dominio.Entidades
{
    public class Usuario : Entidade
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Nome { get; set; }
        public string SobreNome { get; set; }

        /// <summary>
        /// Um usuário pode ter nenhum ou muitos pedidos
        /// </summary>

        public virtual ICollection<Pedido> Pedidos { get; set; }

        public override void Validate()
        {
            if (string.IsNullOrEmpty(Email))
                AdicionarMensagem("Email não foi informado!");

            if (string.IsNullOrEmpty(Senha))
                AdicionarMensagem("Senha não foi informada!");

            if (string.IsNullOrEmpty(Nome))
                AdicionarMensagem("Nome não foi informado!");

            if (string.IsNullOrEmpty(SobreNome))
                AdicionarMensagem("SobreNome não foi informado!");
        }
    }
}
