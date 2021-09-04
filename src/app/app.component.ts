import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'fractal-tree';
  canvas: any;
  ctx: any;
  theme: any;
  curve: any;
  beizerCurve: any;
  color1: any = 'brown';
  color2: any = 'pink';

  ngOnInit() {
    this.canvas =
      /** @type {HTMLCanvasElement} */ document.getElementById('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    this.theme = {
      background: '#000',
      color1: '#fff',
      shadow: '#fff4',
    };
    this.curve = 13;
    this.beizerCurve = 10;

    if (this.canvas.width < 500) {
      this.drawTree(this.canvas.width / 2, this.canvas.height - 140, 60, 0, 24);
    } else {
      this.drawTree(this.canvas.width / 2, this.canvas.height - 80, 120, 0, 24);
    }
  }

  themeToggle(e,canvasRef:HTMLCanvasElement) {
    if (e.target.checked) {
      this.theme = {
        background: '#000',
        color: '#fff',
        shadow: '#fff4',
      };
    } else {
      this.theme = {
        background: '#fff',
        color: '#000',
        shadow: '#0006',
      };
    }
    canvasRef.style.background = this.theme.background;
  }

  drawTree(startX, startY, length, angle, branchWidth) {
    this.ctx.beginPath();
    this.ctx.save();
    this.ctx.strokeStyle = this.color1;
    this.ctx.fillStyle = this.color2;
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = this.theme.shadow;
    this.ctx.lineWidth = branchWidth;
    this.ctx.translate(startX, startY);
    this.ctx.rotate((angle * Math.PI) / 180);
    this.ctx.moveTo(0, 0);
    if (angle > 0)
      this.ctx.bezierCurveTo(
        this.beizerCurve,
        -length / 2,
        this.beizerCurve,
        -length / 2,
        0,
        -length
      );
    else
      this.ctx.bezierCurveTo(
        this.beizerCurve,
        -length / 2,
        -this.beizerCurve,
        -length / 2,
        0,
        -length
      );
    this.ctx.stroke();
    if (length < 20) {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color2;
      this.ctx.bezierCurveTo(25.47, 11.58, 0.77, 19, 1.9, 0.9);
      this.ctx.moveTo(0, -length);
      this.ctx.bezierCurveTo(22.97, -5.77, 25.47, 11.58, 1.9, 0.9);
      // ctx.arc(0, -length, 10, 0, Math.PI / 1.2)
      this.ctx.fill();
      this.ctx.restore();
      return;
    }
    this.curve = Math.random() * 10 + 10;
    this.drawTree(
      0,
      -length,
      length * 0.82,
      angle + this.curve,
      branchWidth * 0.7
    );
    this.drawTree(
      0,
      -length,
      length * 0.82,
      angle - this.curve,
      branchWidth * 0.7
    );
    this.ctx.restore();
  }

  generate() {
    this.beizerCurve = Math.random() * 20 + 10;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let length;
    let branchWidth;
    let h;
    if (this.canvas.width < 500) {
      length = Math.floor(Math.random() * 20 + 60);
      branchWidth = Math.random() * 25 + 1;
      h = 140;
    } else {
      length = Math.floor(Math.random() * 20 + 100);
      branchWidth = Math.random() * 80 + 1;
      h = 80;
    }
    let angle = 0;
    this.color1 =
      'rgba(' +
      Math.random() * 255 +
      ',' +
      Math.random() * 255 +
      ',' +
      Math.random() * 255 +
      ')';
    this.color2 =
      'rgba(' +
      Math.random() * 255 +
      ',' +
      Math.random() * 255 +
      ',' +
      Math.random() * 255 +
      ')';
    this.drawTree(
      this.canvas.width / 2,
      this.canvas.height - h,
      length,
      angle,
      branchWidth
    );
  }
}
