using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Timesheet.Data.Migrations
{
    public partial class addnewtablereason : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTask_Project_Id",
                table: "ProjectTask");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ProjectTask",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.CreateTable(
                name: "Reason",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reason", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTask_ProjectId",
                table: "ProjectTask",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTask_Project_ProjectId",
                table: "ProjectTask",
                column: "ProjectId",
                principalTable: "Project",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTask_Project_ProjectId",
                table: "ProjectTask");

            migrationBuilder.DropTable(
                name: "Reason");

            migrationBuilder.DropIndex(
                name: "IX_ProjectTask_ProjectId",
                table: "ProjectTask");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ProjectTask",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTask_Project_Id",
                table: "ProjectTask",
                column: "Id",
                principalTable: "Project",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
