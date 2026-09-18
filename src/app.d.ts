import type { Env } from '../.wrangler/types/worker-configuration';

declare global {
	namespace App {
		interface Platform {
			env: Env;
		}
	}
}

export {};
