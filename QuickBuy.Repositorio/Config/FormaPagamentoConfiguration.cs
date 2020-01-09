using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.ObjetoValor;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Repositorio.Config
{
    class FormaPagamentoConfiguration : IEntityTypeConfiguration<FormaPagamento>
    {
        public void Configure(EntityTypeBuilder<FormaPagamento> builder)
        {
            builder.HasKey(fp => fp.Id);

            // Builder utiliza o padrão Fluent
            builder
                .Property(fp => fp.Nome)
                .IsRequired()
                .HasMaxLength(50);

            builder
                .Property(fp => fp.Descricao)
                .IsRequired()
                .HasMaxLength(100);
        }
    }
}
