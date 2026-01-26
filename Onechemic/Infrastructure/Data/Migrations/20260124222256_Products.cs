using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class Products : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TitleEn = table.Column<string>(type: "text", nullable: false),
                    TitleAr = table.Column<string>(type: "text", nullable: false),
                    DescriptionEn = table.Column<string>(type: "text", nullable: false),
                    DescriptionAr = table.Column<string>(type: "text", nullable: false),
                    DetailedDescriptionEn = table.Column<string>(type: "text", nullable: false),
                    DetailedDescriptionAr = table.Column<string>(type: "text", nullable: false),
                    ImagePath = table.Column<string>(type: "text", nullable: false),
                    Nav = table.Column<string>(type: "text", nullable: false),
                    CategoryEn = table.Column<string>(type: "text", nullable: false),
                    CategoryAr = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
