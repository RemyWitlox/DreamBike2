package dockingBike;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("bikeService")
public class BikeServiceImpl implements BikeService {

	private final BikeRepository bikeRepository;
	private final ModelMapper modelMapper;

	@Autowired
	public BikeServiceImpl(BikeRepository bikeRepository, ModelMapper modelMapper) {
		this.bikeRepository = bikeRepository;
		this.modelMapper = modelMapper;
	}

	@Override
	public int getDockingId(int bikeId) {
		return bikeRepository.getOne(bikeId).getDocking().getDockingId();
	}

	@Override
	public BikeDTO convertToDto(Bike bike) {
		modelMapper.getConfiguration().setAmbiguityIgnored(true);
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		return modelMapper.map(bike, BikeDTO.class);
	}

	@Override
	public Bike getByBikeId(int bikeId) {
		return bikeRepository.findByBikeId(bikeId);
	}

	@Override
	public Bike save(Bike bike) {
		return bikeRepository.save(bike);
	}

}
