import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interfaces/mascota';



const listadoMascotas: Mascota[] = [
  { nombre: 'Ciro', edad: 3, raza: 'Golden', color: 'dorado', peso: 13},
  { nombre: 'Chupita', edad: 3, raza: 'Maltipu', color: 'blanco', peso: 5},
  { nombre: 'Lobo', edad: 5, raza: 'chihuahua', color: 'negro', peso: 24},
  { nombre: 'Jack', edad: 6, raza: 'Samoyedo', color: 'blanco', peso: 8},
];

@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones'];
  dataSource = new MatTableDataSource<Mascota>(listadoMascotas);
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Items por pagina';
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarMascota(){
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      
      this._snackBar.open('La mascota fue eliminada con éxito','', {
        duration: 4000,
        horizontalPosition: 'right'
      });
    }, 3000);

  }

}
