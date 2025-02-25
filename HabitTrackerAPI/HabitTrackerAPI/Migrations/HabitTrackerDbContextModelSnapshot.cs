﻿// <auto-generated />
using System;
using HabitTrackerAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HabitTrackerAPI.Migrations
{
    [DbContext(typeof(HabitTrackerDbContext))]
    partial class HabitTrackerDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("HabitTrackerAPI.Models.Habit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Frequency")
                        .HasColumnType("int");

                    b.Property<string>("FrequencyUnit")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Goal")
                        .HasColumnType("int");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("LastCompleted")
                        .HasColumnType("datetime2");

                    b.Property<int>("LongestStreak")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Streak")
                        .HasColumnType("int");

                    b.Property<int>("TotalCompleted")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Habits");
                });

            modelBuilder.Entity("HabitTrackerAPI.Models.HabitCompletion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CompletedOn")
                        .HasColumnType("datetime2");

                    b.Property<int>("HabitId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("HabitCompletions");
                });
#pragma warning restore 612, 618
        }
    }
}
