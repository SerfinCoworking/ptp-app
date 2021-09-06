export const environment = {
  production: true,
  API_END_POINT: 'https://ptp-security-api.herokuapp.com/api',
  CONCEPT_ALTA: 'ALTA',
  CONCEPT_ACTIVO: 'ACTIVO',
  CONCEPT_BAJA: 'BAJA',
  CONCEPT_PRE_BAJA: 'PRE_BAJA',
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
  CONCEPT_PLUS_RESPONSABILIDAD: 'PLUS_RESPONSABILIDAD',
  CONCEPT_LIC_JUS_REASONS: [
    {
      key: "FALLEC_ESPOSA_HIJOS_PADRES",
      name: "Fallecimiento de esposa, hijos o padres",
      exportHeader: "Esposa, hijos o padres (HS)",
    },
    {
      key: "FALLEC_SUEGROS_HERMANOS",
      name: "Fallecimiento de suegros o hermanos",
      exportHeader: "Suegros o hermanos (HS)",
    },
    {
      key: "FALLEC_YERNO_NUERA",
      name: "Fallecimiento de yerno o nuera",
      exportHeader: "Yerno o nuera (HS)",
    },
    {
      key: "NAC_HIJO_ADOPCION",
      name: "Nacimiento de hijo o adopción",
      exportHeader: "Nac. hijo o adopción (HS)",
    },
    {
      key: "MATRIMONIO",
      name: "Matrimonio",
      exportHeader: "Matrimonio (HS)",
    },
    {
      key: "EXAMEN",
      name: "Exámenes",
      exportHeader: "Exámenes (HS)",
    },
    {
      key: "EMFERMEDAD",
      name: "Enfermedad",
      exportHeader: "Enfermedad (HS)"
    }  
  ]
};
