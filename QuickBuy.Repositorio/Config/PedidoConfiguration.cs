using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Repositorio.Config
{
    class PedidoConfiguration : IEntityTypeConfiguration<Pedido>
    {
        public void Configure(EntityTypeBuilder<Pedido> builder)
        {
            builder.HasKey(pd => pd.Id);

            // Builder utiliza o padrão Fluent
            builder
                .Property(pd => pd.DataPrevisaoEntrega)
                .IsRequired();

            builder
                .Property(pd => pd.CEP)
                .IsRequired()
                .HasMaxLength(10);

            builder
               .Property(pd => pd.Cidade)
               .IsRequired()
               .HasMaxLength(100);

            builder
               .Property(pd => pd.Estado)
               .IsRequired()
               .HasMaxLength(100);

            builder
               .Property(pd => pd.EnderecoCompleto)
               .IsRequired()
               .HasMaxLength(100);

            builder
               .Property(pd => pd.NumeroEndereco)
               .IsRequired();
        }
    }
}
