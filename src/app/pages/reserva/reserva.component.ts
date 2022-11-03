import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

import { Reserva } from 'src/app/models/reserva.model';

// SERVICES
import { ReservaService } from 'src/app/services/reserva.service';

import { environment } from '../../../environments/environment';
const local_url = environment.local_url;

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styles: [
  ]
})
export class ReservaComponent implements OnInit {

  constructor(  private activatedRoute: ActivatedRoute,
                private router: Router,
                private reservaService: ReservaService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({id, productos}) => {

      this.cargarReserva(id);

      this.link = `${local_url}/reserva/${id}`
      
    });

  }

  /** =====================================================================
   *  GET RESERVA ID
  =========================================================================*/
  public link: string = '';
  public reserva!: Reserva;
  cargarReserva(id: string){

    this.reservaService.loadReservaId(id)
        .subscribe( ({reserva}) => {

          this.reserva = reserva;

        });

  }

  /** =====================================================================
   *  COMPARTIR LINK
  =========================================================================*/
  public linkCopy: boolean= false;
  share(){
    
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.linkCopy = true;
    
    setTimeout( () => {
      
      this.linkCopy = false;
    }, 2000);

  }

  /** =====================================================================
   *  PDF
  =========================================================================*/

  downloadPDF() {
    
    // Extraemos el
    const DATA = document.getElementById('pdf') as HTMLElement;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas( DATA , options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'JPG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`reservacion/${this.reserva.rid}.pdf`);
    });
  }


  // FIN DE LA CLASE
}
