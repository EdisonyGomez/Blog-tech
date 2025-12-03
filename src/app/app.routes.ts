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
import { PoliticaCookies } from './pages/politica-cookies/politica-cookies';
import { AvisoLegal } from './pages/aviso-legal/aviso-legal';
import { AboutMe } from './pages/about-me/about-me';
import { UsarIaProductividad } from './pages/articulos/usar-ia-productividad/usar-ia-productividad';
import { MemoriaPersonal } from './pages/articulos/memoria-personal/memoria-personal';
import { ArticuloNanoBanana } from './pages/articulos/articulo-nano-banana/articulo-nano-banana';

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
    { path: "articulos/productividad-con-ia", component: UsarIaProductividad },
    { path: "articulos/memoria-personal-con-ia", component: MemoriaPersonal},
    { path: "articulos/nano-banana", component: ArticuloNanoBanana},



    { path: "politica-cookies", component: PoliticaCookies },
    { path: "aviso-legal", component: AvisoLegal },
    { path: 'about', component: About },
    { path: 'privacy-policy', component: PrivacyPolicy },
    { path: 'contact', component: Contact },
    { path: 'about-me', component: AboutMe },
    { path: '**', redirectTo: '' },



];
