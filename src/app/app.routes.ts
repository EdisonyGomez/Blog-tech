import { CrearCurriculumIa } from './pages/articulos/crear-curriculum-ia/crear-curriculum-ia';
import { RutinaInteligentIa } from './pages/articulos/rutina-inteligent-ia/rutina-inteligent-ia';
import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Articulos } from './pages/articulos/articulos';
import { UsarChatgpt } from './pages/articulos/usar-chatgpt/usar-chatgpt';
import { CanvaAi } from './pages/articulos/canva-ai/canva-ai';
import { AutomatizarCorreo } from './pages/articulos/automatizar-correo/automatizar-correo';
import { About } from './pages/about/about';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { Contact } from './pages/contact/contact';
import { OrganizaTareas } from './pages/articulos/organiza-tareas/organiza-tareas';
import { CrearAsistenteIa } from './pages/articulos/crear-asistente-ia/crear-asistente-ia';
import { PlanearViajeIa } from './pages/articulos/planear-viaje-ia/planear-viaje-ia';

export const routes: Routes = [
    { path: '', component: Inicio},
    { path: 'articulos', component: Articulos },
    
    { path: 'articulos/usar-chatgpt-vida-diaria', component: UsarChatgpt },
    { path: 'articulos/canva-ai-presentaciones', component: CanvaAi },
    { path: 'articulos/automatizar-correo-ia', component: AutomatizarCorreo },
    { path: 'articulos/organiza-tareas-ia', component: OrganizaTareas }, 
    { path: 'articulos/crear-asistente-ia', component: CrearAsistenteIa },
    { path: "articulos/planear-viaje-con-ia", component: PlanearViajeIa },
    { path: "articulos/rutina-inteligente-con-ia", component: RutinaInteligentIa },
    { path: "articulos/crear-curriculum-con-ia", component: CrearCurriculumIa },

    { path: 'about', component: About },
    { path: 'privacy-policy', component: PrivacyPolicy },
    { path: 'contact', component: Contact },
    { path: '**', redirectTo: '' },



];
