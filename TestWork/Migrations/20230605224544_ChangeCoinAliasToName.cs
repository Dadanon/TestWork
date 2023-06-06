using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestWork.Migrations
{
    /// <inheritdoc />
    public partial class ChangeCoinAliasToName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Alias",
                table: "Coins");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Coins",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Coins");

            migrationBuilder.AddColumn<string>(
                name: "Alias",
                table: "Coins",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
