package com.example.thangcachep.movie_project_be.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mm = new ModelMapper();
        mm.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT)
                .setSkipNullEnabled(true);
        return mm;
    }

}


//
//mm.addMappings(new PropertyMap<UserEntity, UserDTO>() {
//    @Override
//    protected void configure() {
//        map().setRoleName(source.getRole().getRoleName());
//    }
//});
