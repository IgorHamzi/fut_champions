import * as cors from 'cors';
import * as express from 'express';
import LoginRoute from './routes/LoginRoute';
import TeamsRoute from './routes/TeamsRoute';
import MatchesRoute from './routes/MatchesRoute';
import LeaderboardsRoute from './routes/LeaderboardsRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(cors());

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/login', LoginRoute);
    this.app.use('/teams', TeamsRoute);
    this.app.use('/matches', MatchesRoute);
    this.app.use('/leaderboard', LeaderboardsRoute);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
