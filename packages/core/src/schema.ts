import { Account, CoMap, Profile, co } from "jazz-tools";

export class AppProfile extends Profile {
  name = co.string;
}

// Root account schema — extended with profile and app data in story 004.
export class AppAccount extends Account {
  profile = co.ref(AppProfile);
  root = co.optional.ref(CoMap);

  migrate() {
    if (!this._refs.root) {
      this.root = CoMap.create({}, { owner: this });
    }
  }
}
