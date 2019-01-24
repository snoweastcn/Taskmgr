import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const imgDir = 'assets/images';
  const sideBarDir = `${imgDir}/sidebar`;
  const dayDir = `${imgDir}/days`;
  const avatarDir = `${imgDir}/avatar`;
  const iconsDir = `${imgDir}/icons`;
  ir.addSvgIcon('shopping-car', ds.bypassSecurityTrustResourceUrl(`${imgDir}/shopping-car.svg`));
  ir.addSvgIcon('day', ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/day.svg`));
  ir.addSvgIcon('week', ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/week.svg`));
  ir.addSvgIcon('month', ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/month.svg`));
  ir.addSvgIcon('project', ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/project.svg`));
  ir.addSvgIcon('projects', ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/projects.svg`));
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ];
  days.forEach(d => ir.addSvgIcon(`day${d}`, ds.bypassSecurityTrustResourceUrl(`${dayDir}/day${d}.svg`)));
  ir.addSvgIcon('avatar', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatar.svg`));
  ir.addSvgIcon('unassigned', ds.bypassSecurityTrustResourceUrl(`${avatarDir}/unassigned.svg`));
  ir.addSvgIcon('move', ds.bypassSecurityTrustResourceUrl(`${iconsDir}/move.svg`));
  ir.addSvgIcon('delete', ds.bypassSecurityTrustResourceUrl(`${iconsDir}/delete.svg`));
};
