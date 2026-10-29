
import { platformNativeScript, runNativeScriptAngularApp, registerElement } from '@nativescript/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';
import { AppModule } from './app/app.module';

registerElement('PullToRefresh', () => PullToRefresh);

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});


