export class Manager {
  private manager: Record<string, any> = {};
  private static instance: Manager;

  private constructor() {
    // constructor is private
  }

  static getInstance(): Manager {
    if (!Manager.instance) {
      Manager.instance = new Manager();
    }
    return Manager.instance;
  }

  setLogin(loginFunction: any) {
    this.manager.loginFunction = loginFunction;
  }
}
