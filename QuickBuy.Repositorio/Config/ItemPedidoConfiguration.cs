using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;

namespace QuickBuy.Repositorio.Config
{
    class ItemPedidoConfiguration : IEntityTypeConfiguration<ItemPedido>
    {
        public void Configure(EntityTypeBuilder<ItemPedido> builder)
        {
            builder.HasKey(itp => itp.Id);

            // Builder utiliza o padrão Fluent
            builder
                .Property(itp => itp.ProdutoId)
                .IsRequired();

            builder
                .Property(itp => itp.Quantidade)
                .IsRequired();
        }
    }
}
