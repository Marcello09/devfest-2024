import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NgxScannerQrcodeModule, LOAD_WASM, NgxScannerQrcodeService, NgxScannerQrcodeComponent, ScannerQRCodeResult, ScannerQRCodeConfig } from 'ngx-scanner-qrcode';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Necessary to solve the problem of losing internet connection
LOAD_WASM().subscribe();

@Component({
  selector: 'app-scan',
  standalone: true,
  imports: [NgxScannerQrcodeModule, RouterModule],
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.scss'
})
export class ScanComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scanner') scanner!: NgxScannerQrcodeComponent;
  config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth
      }
    }
  }
  sala = ''

  constructor(
    private qrcode: NgxScannerQrcodeService, 
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.api.leituras = {}
    this.activatedRoute.snapshot.params['id'] ? 
      this.sala = this.activatedRoute.snapshot.params['id'] : this.sala = ''
  }

  ngAfterViewInit(): void {
    if (this.scanner) {
      this.scanner.isReady.subscribe(() => {
        this.start()
      })
    }
  }

  ngOnDestroy(): void {
    this.scanner.stop();
  }

  start() {
    this.scanner.start((devices:any) => this.playBackFacingCamera(devices)).subscribe((r) => console.log(r))
  }

  playBackFacingCamera(devices: any[]) {
    const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
    this.scanner.playDevice(device ? device.deviceId : devices[0].deviceId);
  }

  onRead(evento: ScannerQRCodeResult[]) {
    evento.forEach(leitura => {
      this.api.adicionarPessoaUmaVez(this.sala, leitura.value).subscribe(() => {})
    })
  }
}
