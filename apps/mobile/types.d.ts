// CSS module imports — used by the web platform target via Metro
declare module "*.module.css" {
  const styles: Record<string, string>;
  export default styles;
}

// Side-effect CSS imports — used for global styles on web (e.g. @/global.css)
declare module "*.css" {}
