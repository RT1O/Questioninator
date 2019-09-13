import PollRepository from "./repositories/PollRepository";

const repositories = {
  polls: PollRepository
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
