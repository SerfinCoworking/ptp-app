// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_END_POINT: 'http://localhost:4000/api',
  CONCEPT_BAJA: 'BAJA',
  CONCEPT_SUSPENSION: 'SUSPENSION',
  CONCEPT_FERIADO: 'FERIADO',
  CONCEPT_VACACIONES: 'VACACIONES',
  CONCEPT_ADELANTO: 'ADELANTO',
  CONCEPT_LIC_JUSTIFICADA: 'LIC_JUSTIFICADA',
  CONCEPT_LIC_NO_JUSTIFICADA: 'LIC_NO_JUSTIFICADA',
  CONCEPT_ART: 'ART',
  CONCEPT_CAPACITACION: 'CAPACITACIONES',
  CONCEPT_LIC_SIN_SUELDO: 'LIC_SIN_SUELDO',
  CONCEPT_EMBARGO: 'EMBARGO',
  CONCEPT_LIC_JUS_REASONS: [
    {
      key: "FALLEC_ESPOSA_HIJOS_PADRES",
      name: "Fallecimiento de esposa, hijos o padres",
    },
    {
      key: "FALLEC_SUEGROS_HERMANOS",
      name: "Fallecimiento de suegros o hermanos",
    },
    {
      key: "NAC_HIJO_ADOPCION",
      name: "Nacimiento de hijo o adopción",
    },
    {
      key: "FALLEC_YERNO_NUERA",
      name: "Fallecimiento de yerno o nuera",
    },
    {
      key: "MATRIMONIO",
      name: "Matrimonio",
    },
    {
      key: "EXAMEN",
      name: "Exámenes",
    },
    {
      key: "EMFERMEDAD",
      name: "Emfermedad"
    }  
  ]
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
