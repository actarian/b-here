import { Browser } from 'rxcomp';
import { name, version } from '../../package.json';
import { AppModule } from './app.module';

console.log(name, version);

Browser.bootstrap(AppModule);
