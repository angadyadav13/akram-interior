export type Project={id:string;title:string;slug:string;description:string;category:string;location:string;cover_image:string;published:boolean;created_at?:string;project_images?:ProjectImage[]};
export type ProjectImage={id:string;project_id:string;image_url:string;sort_order:number};
export type Service={id:string;title:string;description:string;image_url:string;sort_order:number;published:boolean};
export type Enquiry={id:string;name:string;phone:string;email:string;project_type:string;property_type:string;budget:string;city:string;message:string;status:string;created_at:string};
export type ContactSettings={phone:string;whatsapp:string;email:string;address:string;facebook:string;instagram:string;google_maps:string;whatsapp_message:string};
export const demoServices:Service[]=[
{id:'s1',title:'Home Interiors',description:'End-to-end home interior design',image_url:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',sort_order:1,published:true},
{id:'s2',title:'Modular Kitchen',description:'Stylish, durable kitchen designs',image_url:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85',sort_order:2,published:true},
{id:'s3',title:'Wardrobes',description:'Smart storage solutions',image_url:'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85',sort_order:3,published:true},
{id:'s4',title:'False Ceiling',description:'Modern ceiling designs',image_url:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85',sort_order:4,published:true},
{id:'s5',title:'TV Units',description:'Elegant entertainment walls',image_url:'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85',sort_order:5,published:true},
{id:'s6',title:'Renovation',description:'Upgrade your existing space',image_url:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85',sort_order:6,published:true}
];
export const demoProjects:Project[]=[
{id:'p1',title:'Modern 3BHK Apartment',slug:'modern-3bhk-apartment',description:'Warm contemporary interiors for a modern family home.',category:'Full Home',location:'Gurgaon',cover_image:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=88',published:true,project_images:[]},
{id:'p2',title:'Luxury Villa',slug:'luxury-villa',description:'Elegant, layered interiors with premium materials.',category:'Full Home',location:'Delhi NCR',cover_image:'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=88',published:true,project_images:[]},
{id:'p3',title:'Compact 2BHK',slug:'compact-2bhk',description:'Space-smart design with refined storage and lighting.',category:'Full Home',location:'Noida',cover_image:'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1200&q=88',published:true,project_images:[]},
{id:'p4',title:'Contemporary Kitchen',slug:'contemporary-kitchen',description:'A functional modular kitchen with a clean modern palette.',category:'Kitchen',location:'Gurgaon',cover_image:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=88',published:true,project_images:[]}
];
export const defaultContact:ContactSettings={phone:'+91 98765 43210',whatsapp:'919876543210',email:'hello@akraminterior.in',address:'Gurgaon, Haryana, India',facebook:'',instagram:'',google_maps:'',whatsapp_message:'Hi, I would like to discuss my home interior project.'};
