import contract from '@truffle/contract';
export const loadContract = async (name, provider) => {
  // const res = await fetch(`/contracts/${name}.json`);
  // const Artifact = await res.json();
  // const _contract = contract(Artifact);
  // _contract.setProvider(provider);

  // const deployedContract = await _contract.deployed();

  const res = await fetch(`/contracts/${name}.json`);

  const _contract = contract(await res.json());

  _contract.setProvider(provider);
  const deployedContract = await _contract.deployed();
  console.log('contract: ', deployedContract)
  return deployedContract;
};
