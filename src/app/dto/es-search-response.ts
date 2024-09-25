    export interface Shards {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    }

    export interface Total {
        value: number;
        relation: string;
    }

    export interface Source {
        name: string;
        age: number;
    }

    export interface Hit {
        _index: string;
        _id: string;
        _score: number;
        _source: Source;
    }

    export interface Hits {
        total: Total;
        max_score: number;
        hits: Hit[];
    }

    export interface EsMatchResponse {
        took: number;
        timed_out: boolean;
        _shards: Shards;
        hits: Hits;
    }

